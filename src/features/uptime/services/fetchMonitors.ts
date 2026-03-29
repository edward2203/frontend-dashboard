/**
 * 📐 Arquitecto Euclidiano - Servicio de Vigilancia de Infraestructura
 */

export interface MonitorStatus {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline';
  latency: number;
  lastCheck: string;
  uptimePercentage: string;
}

const UPTIME_API_URL = 'http://localhost:3000/api/uptime';

export const uptimeService = {
  /**
   * Obtiene el estado actual de todos los monitores de vigilancia.
   */
  async getAllMonitors(): Promise<MonitorStatus[]> {
    try {
      const response = await fetch(`${UPTIME_API_URL}/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store' // Vital para ver caídas en tiempo real
      });

      if (!response.ok) {
        throw new Error('Anomalía en la red al consultar el estado de Uptime.');
      }

      const data = await response.json();
      
      // Mapeamos la respuesta del backend a nuestro contrato de UI
      return data.map((m: any) => ({
        id: m.id,
        name: m.name,
        url: m.url,
        status: m.lastStatusCode >= 200 && m.lastStatusCode < 300 ? 'online' : 'offline',
        latency: m.lastLatencyMs || 0,
        lastCheck: new Date(m.updatedAt).toLocaleTimeString(),
        uptimePercentage: m.uptime30d || '100%'
      }));

    } catch (error) {
      console.error('🚨 Error en uptimeService:', error);
      return []; // Retornamos lista vacía ante fallos de conexión
    }
  }
};
