class Animal {
  constructor(
    public id: number,
    public nombre: string,
    public tipo: string,
    public edad: string,
    public sexo: string,
    public foto: string,
    public raza: string,
    public protectora: string,
    public lugar: string,
    public urgencia: number,
    public descripcion: string,
    public preferencias: string,
    public necesidades: string
  ) {}

  // Método para calcular el color de urgencia basado en la urgencia del animal
  public getUrgencyColor() {
    return `rgba(255, 0, 0, ${this.urgencia * 0.2})`;
  }

  // Método para verificar si un animal cumple con un filtro específico
  public matchesFilters(filters: any): boolean {
    return (
      (!filters.animal || this.tipo === filters.animal) &&
      (!filters.sexo || this.sexo === filters.sexo) &&
      (!filters.edad || this.edad === filters.edad) &&
      (!filters.raza || this.raza === filters.raza) &&
      (!filters.provincia || this.lugar.includes(filters.provincia))
    );
  }
}

export default Animal;
