package api.protectora;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProtectoraServices {
	
	@Autowired
	ProtectoraRepository protectoraRepository;
	
	// Create
    public ProtectoraEntities createProtectora(ProtectoraEntities protectora) {
        return protectoraRepository.save(protectora);
    }

    // Update
    public ProtectoraEntities updateProtectora(Long id, ProtectoraEntities updatedProtectora) {
        return protectoraRepository.findById(id)
                .map(existingProtectora -> {
                    if (updatedProtectora.getName() != null) {
                    	existingProtectora.setName(updatedProtectora.getName());
                    }
                    if (updatedProtectora.getPassword() != null) {
                    	existingProtectora.setPassword(updatedProtectora.getPassword());
                    }
                    if (updatedProtectora.getPlace() != null) {
                    	existingProtectora.setPlace(updatedProtectora.getPlace());
                    }
                    if (updatedProtectora.getLogo_img() != null) {
                    	existingProtectora.setLogo_img(updatedProtectora.getLogo_img());
                    }
                    if (updatedProtectora.getEmail() != null) {
                    	existingProtectora.setEmail(updatedProtectora.getEmail());
                    }
                    if (updatedProtectora.getTelephone() != null) {
                    	existingProtectora.setTelephone(updatedProtectora.getTelephone());
                    }
                    if (updatedProtectora.getType() != null) {
                    	existingProtectora.setType(updatedProtectora.getType());
                    }
                    
                    return protectoraRepository.save(existingProtectora);
                })
                .orElseThrow(() -> new RuntimeException("No hem trobat cap protectora amb la ID " + id));
    }

    // Read all
    public List<ProtectoraEntities> getAllProtectora() {
        return protectoraRepository.findAll();
    }

    // Read by id
    public Optional<ProtectoraEntities> getProtectoraById(Long id) {
        return protectoraRepository.findById(id);
    }

    // Delete
    public void deleteProtectora(Long id) {
        protectoraRepository.deleteById(id);
    }
}
