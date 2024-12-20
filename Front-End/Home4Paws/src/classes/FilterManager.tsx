class FilterManager {
    private activeFilters: Record<string, string> = {
      provincia: '',
      animal: '',
      sexo: '',
      edad: '',
      raza: ''
    };
  
    public setFilter(filterName: string, value: string) {
      this.activeFilters[filterName] = value;
    }
  
    public resetFilter(filterName: string) {
      this.activeFilters[filterName] = '';
    }
  
    public getFilters() {
      return this.activeFilters;
    }
  
    public toggleFilter(filterName: string, value: string) {
      if (this.activeFilters[filterName] === value) {
        this.resetFilter(filterName);
      } else {
        this.setFilter(filterName, value);
      }
    }
  }
  
  export default FilterManager;
  