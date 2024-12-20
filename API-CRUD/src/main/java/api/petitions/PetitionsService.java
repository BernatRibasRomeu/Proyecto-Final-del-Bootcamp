package api.petitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetitionsService {
	
	@Autowired
	PetitionsRepository petitionsRepository;
	
//	Create
	public PetitionsEntities createPetition(PetitionsEntities petition) {
		return petitionsRepository.save(petition);
	}
//	Update
	public PetitionsEntities updatePetition(Long id, PetitionsEntities updatePetition) {
		return petitionsRepository.findById(id)
				.map(existingPetitions -> {
					if (updatePetition.getName() != null) {
						existingPetitions.setName(updatePetition.getName());
					}
					if (updatePetition.getSurname() != null) {
						existingPetitions.setSurname(updatePetition.getSurname());
					}
					if (updatePetition.getEmail() != null) {
						existingPetitions.setEmail(updatePetition.getEmail());
					}
					if (updatePetition.getTelephone() != null && updatePetition.getTelephone().matches("\\d+")) {
						existingPetitions.setTelephone(updatePetition.getTelephone());
					}
					if (updatePetition.getPlace() != null) {
						existingPetitions.setPlace(updatePetition.getPlace());
					}
					if (updatePetition.getMessage() != null) {
						existingPetitions.setMessage(updatePetition.getMessage());
					}
					if (updatePetition.getReciverId() != null) {
						existingPetitions.setReciverId(updatePetition.getReciverId());
					}
					if (updatePetition.getEmitterId() != null) {
						existingPetitions.setEmitterId(updatePetition.getEmitterId());
					}
					if (updatePetition.getAnimal_id() != null) {
						existingPetitions.setAnimal_id(updatePetition.getAnimal_id());
					}
					if (updatePetition.getStatus() != null) {
						existingPetitions.setStatus(updatePetition.getStatus());
					}
					
					return petitionsRepository.save(existingPetitions);
				}).orElseThrow(() -> new RuntimeException("No hem trobat cap peticio amb la ID " + id));
	}
//	Read all
	public List<PetitionsEntities> getAllPetitions(){
		return petitionsRepository.findAll();
	}
//	Delete
	public void deletePetitions(Long id) {
		petitionsRepository.deleteById(id);
	}
	// Read reciver petitions
    public List<PetitionsEntities> getPetitionsByReciverId(Long reciverId) {
        return petitionsRepository.findByReciverId(reciverId);
    }
    // Read emitter petitions
    public List<PetitionsEntities> getPetitionsByEmitterId(Long emitterId) {
        return petitionsRepository.findByEmitterId(emitterId);
    }
}
