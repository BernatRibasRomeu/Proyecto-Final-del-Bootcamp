package api.animal;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimalService {
	
    @Autowired
    AnimalRepository animalRepository;

    // Create
    public AnimalEntities createAnimal(AnimalEntities animal) {
        return animalRepository.save(animal);
    }

    // Update
    public AnimalEntities updateAnimal(Long id, AnimalEntities updatedAnimal) {
        return animalRepository.findById(id)
                .map(existingAnimal -> {
                    if (updatedAnimal.getName() != null) {
                        existingAnimal.setName(updatedAnimal.getName());
                    }
                    if (updatedAnimal.getAnimal() != null) {
                    	existingAnimal.setAnimal(updatedAnimal.getAnimal());
                    }
                    if (updatedAnimal.getAge() != null) {
                        existingAnimal.setAge(updatedAnimal.getAge());
                    }
                    if (updatedAnimal.getSex() != null) {
                    	existingAnimal.setSex(updatedAnimal.getSex());
                    }
                    if (updatedAnimal.getImage_url() != null) {
                        existingAnimal.setImage_url(updatedAnimal.getImage_url());
                    }
                    if (updatedAnimal.getRace() != null) {
                        existingAnimal.setRace(updatedAnimal.getRace());
                    }
                    if (updatedAnimal.getProtectora() != null) {
                        existingAnimal.setProtectora(updatedAnimal.getProtectora());
                    }
                    if (updatedAnimal.getPlace() != null) {
                        existingAnimal.setPlace(updatedAnimal.getPlace());
                    }
                    if (updatedAnimal.getUrgency() != null) {
                        existingAnimal.setUrgency(updatedAnimal.getUrgency());
                    }
                    if (updatedAnimal.getDescription() != null) {
                        existingAnimal.setDescription(updatedAnimal.getDescription());
                    }
                    if (updatedAnimal.getPreferences() != null) {
                        existingAnimal.setPreferences(updatedAnimal.getPreferences());
                    }
                    if (updatedAnimal.getNeeds() != null) {
                        existingAnimal.setNeeds(updatedAnimal.getNeeds());
                    }
                    return animalRepository.save(existingAnimal);
                })
                .orElseThrow(() -> new RuntimeException("No hem trobat cap animal amb la ID " + id));
    }

    // Read all
    public List<AnimalEntities> getAllAnimals() {
        return animalRepository.findAll();
    }

    // Read by id
    public Optional<AnimalEntities> getAnimalById(Long id) {
        return animalRepository.findById(id);
    }

    // Delete
    public void deleteAnimal(Long id) {
        animalRepository.deleteById(id);
    }
}
