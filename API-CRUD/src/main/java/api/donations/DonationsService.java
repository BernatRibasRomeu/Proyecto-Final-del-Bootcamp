package api.donations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonationsService {
	
	@Autowired
	DonationsRepository donationRepository;
	
	//	Create
	public DonationsEntities createDonations(DonationsEntities donation) {
		return donationRepository.save(donation);
	}
	//	Update
	public DonationsEntities updateDonation(Long id, DonationsEntities updatedDonation) {
		return donationRepository.findById(id)
				.map(existingDonation -> {
					if (updatedDonation.getAmount() != null) {
						existingDonation.setAmount(updatedDonation.getAmount());
					}
					if (updatedDonation.getFullname() != null) {
						existingDonation.setFullname(updatedDonation.getFullname());
					}
					if (updatedDonation.getEmail() != null) {
						existingDonation.setEmail(updatedDonation.getEmail());
					}
					if (updatedDonation.getMessage() != null) {
						existingDonation.setMessage(updatedDonation.getMessage());
					}
					if (updatedDonation.getReciverId() != null) {
						existingDonation.setReciverId(updatedDonation.getReciverId());
					}
					if (updatedDonation.getEmitterId() != null) {
						existingDonation.setEmitterId(updatedDonation.getEmitterId());
					}
					if (updatedDonation.getAnimal_id() != null) {
						existingDonation.setAnimal_id(updatedDonation.getAnimal_id());
					}
					return donationRepository.save(existingDonation);
				})
				.orElseThrow(() -> new RuntimeException("No hem trobat cap animal amb la ID " + id));
	}
	// Read all
    public List<DonationsEntities> getAllDonations() {
        return donationRepository.findAll();
    }

    // Read by id
    public Optional<DonationsEntities> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    // Delete
    public void deleteDonation(Long id) {
    	donationRepository.deleteById(id);
    }
    // Read reciver donations
    public List<DonationsEntities> getDonationsByReciverId(Long reciverId) {
        return donationRepository.findByReciverIdAndAmountGreaterThan(reciverId, 0);
    }
    // Read emitter donations
    public List<DonationsEntities> getDonationsByEmitterId(Long emitterId) {
        return donationRepository.findByEmitterIdAndAmountGreaterThan(emitterId, 0);
    }
}
