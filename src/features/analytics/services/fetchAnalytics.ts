    /**
 * 📐 Arquitecto Euclidiano - Servicio de Conexión con ClickHouse
 */

// Definimos la forma geométrica de los datos que esperamos del backend
export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  topPages: { url: string; count: number }[];
  visitsByDay: { date: string; count: number }[];
}

const BACKEND_URL = 'http://localhost:3000/api/analytics';

export const analyticsService = {
  /**
   * Recupera las estadísticas generales de un sitio web específico.
   */
  async getStats(websiteId: string): Promise<AnalyticsStats> {
    try {
      // En un entorno real, pasarías el websiteId como query param
      const response = await fetch(`${BACKEND_URL}/stats?websiteId=${websiteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 'cache: no-store' asegura que siempre veamos datos frescos (Tiempo Real)
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Fallo en la matriz de red al recuperar analíticas.');
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('🚨 Error en fetchAnalytics service:', error);
      // Devolvemos un estado vacío pero válido para no romper la UI
      return {
        totalVisits: 0,
        uniqueVisitors: 0,
        topPages: [],
        visitsByDay: []
      };
    }
  }
};
