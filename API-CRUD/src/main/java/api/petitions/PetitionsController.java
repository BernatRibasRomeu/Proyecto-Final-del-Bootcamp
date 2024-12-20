package api.petitions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/home4paws/petitions")
public class PetitionsController {
	
	@Autowired
	private PetitionsService petitionsService;
	
//	Creat nova peticio
	@PostMapping
	public PetitionsEntities createPetition(@RequestBody PetitionsEntities petition) {
		return petitionsService.createPetition(petition);
	}
//	Actualitzem peticio per ID
	@PutMapping("/{id}")
	public ResponseEntity<PetitionsEntities> updatePetition(@PathVariable Long id, @RequestBody PetitionsEntities petition) {
		try {
			PetitionsEntities updatePetitions = petitionsService.updatePetition(id, petition);
			return ResponseEntity.ok(updatePetitions);
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}
//	Get petitions by reciver id
	@GetMapping("/recived/{reciverId}")
    public ResponseEntity<List<PetitionsEntities>> getPetitionsByReceiverId(@PathVariable Long reciverId) {
        List<PetitionsEntities> petitions = petitionsService.getPetitionsByReciverId(reciverId);
        if (petitions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(petitions);
    }
//	Get petitions by emitter id
	@GetMapping("/sent/{emitterId}")
    public ResponseEntity<List<PetitionsEntities>> getPetitionsByEmitterId(@PathVariable Long emitterId) {
        List<PetitionsEntities> petitions = petitionsService.getPetitionsByEmitterId(emitterId);
        if (petitions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(petitions);
    }
	
}
