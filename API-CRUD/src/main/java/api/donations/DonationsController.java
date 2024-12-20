package api.donations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.email.EmailService;

import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping(value = "/home4paws/donations")
public class DonationsController {
	
	@Autowired
	private DonationsService donationsService;
	
	@Autowired
	private EmailService emailService;
	
//	Create donation
	@PostMapping
	public DonationsEntities createDonation(@RequestBody DonationsEntities donations) {
		emailService.emailDonation(donations);
		return donationsService.createDonations(donations);
	}
//	Get all donations 
	@GetMapping
	public List<DonationsEntities> getAllDonations(){
		return donationsService.getAllDonations();
	}
//	Get donations by reciver id
	@GetMapping("/recived/{reciverId}")
    public ResponseEntity<List<DonationsEntities>> getDonationsByReceiverId(@PathVariable Long reciverId) {
        List<DonationsEntities> donations = donationsService.getDonationsByReciverId(reciverId);
        if (donations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(donations);
    }
//	Get donations by emitter id
	@GetMapping("/sent/{emitterId}")
    public ResponseEntity<List<DonationsEntities>> getDonationsByEmitterId(@PathVariable Long emitterId) {
        List<DonationsEntities> donations = donationsService.getDonationsByEmitterId(emitterId);
        if (donations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(donations);
    }
//	Actualitzem una donacio per ID
	@PutMapping("/{id}")
	public ResponseEntity<DonationsEntities> updateDonations(@PathVariable Long id, @RequestBody DonationsEntities donations) {
		try {
			DonationsEntities updateDonations = donationsService.updateDonation(id, donations);
			return ResponseEntity.ok(updateDonations);
		} catch (RuntimeException e){
			return ResponseEntity.notFound().build();
		}
	}
//	Eliminem una donacio per ID
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDonation(@PathVariable Long id){
		donationsService.deleteDonation(id);
		return ResponseEntity.noContent().build();
	}
}
