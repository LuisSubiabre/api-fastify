class AtrasosService {
    async getAtrasosByEstudianteId(estudiante_id) {
      // Aquí iría la consulta a la base de datos o lógica para obtener los atrasos
      return [{ id: 1, estudiante_id, motivo: "Llegó tarde" }];
    }
  }
  
  export default AtrasosService;
  