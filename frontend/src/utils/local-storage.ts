import { Employee } from '@/types';

const DB_NAME = 'RPGPixelOffice';
const STORE_NAME = 'teams';
const DB_VERSION = 1;

interface SavedTeam {
  id: string;
  name: string;
  employees: Employee[];
  createdAt: string;
  updatedAt: string;
}

let db: IDBDatabase | null = null;

/**
 * Initialize IndexedDB
 */
export async function initDB(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const currentDB = (event.target as IDBOpenDBRequest).result;
      if (!currentDB.objectStoreNames.contains(STORE_NAME)) {
        currentDB.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

/**
 * Save a team to IndexedDB
 */
export async function saveTeam(
  name: string,
  employees: Employee[]
): Promise<SavedTeam> {
  const idb = await initDB();

  const team: SavedTeam = {
    id: `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    employees,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return new Promise((resolve, reject) => {
    const transaction = idb.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(team);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(team);
  });
}

/**
 * Get all saved teams
 */
export async function getAllTeams(): Promise<SavedTeam[]> {
  const idb = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = idb.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
}

/**
 * Get a specific team by ID
 */
export async function getTeam(id: string): Promise<SavedTeam | undefined> {
  const idb = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = idb.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Update a team
 */
export async function updateTeam(
  id: string,
  name: string,
  employees: Employee[]
): Promise<SavedTeam> {
  const idb = await initDB();

  const existingTeam = await getTeam(id);
  if (!existingTeam) {
    throw new Error(`Team ${id} not found`);
  }

  const updatedTeam: SavedTeam = {
    ...existingTeam,
    name,
    employees,
    updatedAt: new Date().toISOString(),
  };

  return new Promise((resolve, reject) => {
    const transaction = idb.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(updatedTeam);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(updatedTeam);
  });
}

/**
 * Delete a team
 */
export async function deleteTeam(id: string): Promise<void> {
  const idb = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = idb.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Export teams as JSON (for sharing)
 */
export async function exportTeams(): Promise<string> {
  const teams = await getAllTeams();
  return JSON.stringify(teams, null, 2);
}

/**
 * Import teams from JSON
 */
export async function importTeams(json: string): Promise<SavedTeam[]> {
  try {
    const teams = JSON.parse(json) as SavedTeam[];
    const idb = await initDB();

    const imported: SavedTeam[] = [];
    for (const team of teams) {
      const newTeam: SavedTeam = {
        ...team,
        id: `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      await new Promise((resolve, reject) => {
        const transaction = idb.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(newTeam);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          imported.push(newTeam);
          resolve(null);
        };
      });
    }

    return imported;
  } catch (error) {
    throw new Error(`Failed to import teams: ${error}`);
  }
}
