package api.crowdfunding;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/home4paws/crowdfunding")
public class CrowdFundingController {
	
	@Autowired
	private CrowdFundingService cfService;
	
//	Create new CrowdFunding
	@PostMapping
	public CrowdFundingEntities createCrowdFunding(@RequestBody CrowdFundingEntities cf) {
		return cfService.createCrowdFunding(cf);
	}
//	Get all CrowdFunding
	@GetMapping
	public List<CrowdFundingEntities> getAllCrowdFunding(){
		return cfService.getAllCrowdFunding();
	}
//	Get CrowdFunding by id
	@GetMapping("/{id}")
	public ResponseEntity<CrowdFundingEntities> getCrowdFundingById(@PathVariable Long id) {
		Optional<CrowdFundingEntities> cf = cfService.getCrowdFundingById(id);
		return cf.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
//	Update CrowdFunding
	@PutMapping("/{id}")
	public ResponseEntity<CrowdFundingEntities> updateCrowdFunding(@PathVariable Long id, @RequestBody CrowdFundingEntities cf) {
		try {
			CrowdFundingEntities updateCF = cfService.updateCrowdFunding(id, cf);
			return ResponseEntity.ok(updateCF);
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}
//	Delete CrowdFunding
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCrowdFunding(@PathVariable Long id){
		cfService.deleteCrowdFunding(id);
		return ResponseEntity.noContent().build();
	}
}