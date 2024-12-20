package api.crowdfunding;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrowdFundingService {
	
	@Autowired
	CrowdFundingRepository cfRepository;
	
//	Create
	public CrowdFundingEntities createCrowdFunding(CrowdFundingEntities cf) {
		return cfRepository.save(cf);
	}
//	Update
	public CrowdFundingEntities updateCrowdFunding(Long id, CrowdFundingEntities updateCF) {
		return cfRepository.findById(id)
				.map(existingCF -> {
					if (updateCF.getName() != null) {
						existingCF.setName(updateCF.getName());
					}
					if (updateCF.getImages() != null) {
						existingCF.setImages(updateCF.getImages());
					}
					if (updateCF.getType() != null) {
						existingCF.setType(updateCF.getType());
					}
					if (updateCF.getCampaigntitle() != null) {
						existingCF.setCampaigntitle(updateCF.getCampaigntitle());
					}
					if (updateCF.getDescription() != null) {
						existingCF.setDescription(updateCF.getDescription());
					}
					if (updateCF.getRaised() != null) {
						existingCF.setRaised(updateCF.getRaised());
					}
					if (updateCF.getTarget() != null) {
						existingCF.setTarget(updateCF.getTarget());
					}
					if (updateCF.getRemainingtime() != null) {
						existingCF.setRemainingtime(updateCF.getRemainingtime());
					}
					return cfRepository.save(existingCF);
				})
				.orElseThrow(() -> new RuntimeException("No hem trobat cap micromesenatge amb la ID " + id));
	}
//	Read all
	public List<CrowdFundingEntities> getAllCrowdFunding(){
		return cfRepository.findAll();
	}
//	Read by id
	public Optional<CrowdFundingEntities> getCrowdFundingById(Long id){
		return cfRepository.findById(id);
	}
//	Delete
	public void deleteCrowdFunding(Long id) {
		cfRepository.deleteById(id);
	}
}
