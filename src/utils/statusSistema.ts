function pad(number: number) {
  return (number < 10 ? '0' : '') + number;
}

function formatMemory(bytes: any) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let bytesRemaining = bytes;
  let unitIndex = 0;

  while (bytesRemaining >= 1024 && unitIndex < units.length - 1) {
    bytesRemaining /= 1024;
    unitIndex++;
  }

  return `${bytesRemaining.toFixed(2)} ${units[unitIndex]}`;
}

export function getMemoryUsage() {
  const memoryUsage = process.memoryUsage();

  const formattedMemoryUsage = {
    rss: formatMemory(memoryUsage.rss),
    heapTotal: formatMemory(memoryUsage.heapTotal),
    heapUsed: formatMemory(memoryUsage.heapUsed),
    external: formatMemory(memoryUsage.external),
    arrayBuffers: formatMemory(memoryUsage.arrayBuffers),
  };

  return formattedMemoryUsage;
}

export function runtime() {
  const uptimeInSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = uptimeInSeconds % 60;

  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return formattedTime;
}
