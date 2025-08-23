// server/db/backup.js
import { backup, DatabaseSync } from 'node:sqlite';

export async function createBackup(sourceDbPath, backupDbPath) {
  const sourceDb = new DatabaseSync(sourceDbPath);
  const totalPagesTransferred = await backup(sourceDb, backupDbPath, {
    rate: 1, // Copia una página a la vez.
    progress: ({ totalPages, remainingPages }) => {
      console.log('Backup en progreso', { totalPages, remainingPages });
    },
  });

  console.log('Backup completado', totalPagesTransferred);
}