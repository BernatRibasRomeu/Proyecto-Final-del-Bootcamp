package api.protectora;

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
@RequestMapping(value = "/home4paws/protectores")
public class ProtectoraController {
	
	@Autowired
	private ProtectoraServices protectoraServices;
	
	//Crear nova protectora
			@PostMapping
			public ProtectoraEntities createProtectora(@RequestBody ProtectoraEntities protectora) {
				return protectoraServices.createProtectora(protectora);
			}
			//Obtenir totes les protectores
			@GetMapping
			public List<ProtectoraEntities> getAllProtectora(){
				return protectoraServices.getAllProtectora();
			}
			//Obtenim una protectora per ID
			@GetMapping("/{id}")
			public ResponseEntity<ProtectoraEntities> getProtectoraById(@PathVariable Long id) {
				Optional<ProtectoraEntities> users = protectoraServices.getProtectoraById(id);
				return users.map(ResponseEntity::ok)
						.orElse(ResponseEntity.notFound().build());
			}
			//Actualitzem una protectora per ID
			@PutMapping("/{id}")
			public ResponseEntity<ProtectoraEntities> updateProtectora(@PathVariable Long id, @RequestBody ProtectoraEntities protectora){
				try {
					ProtectoraEntities updateProtectora = protectoraServices.updateProtectora(id, protectora);
					return ResponseEntity.ok(updateProtectora);
				} catch (RuntimeException e) {
					return ResponseEntity.notFound().build();
				}
			}

			//Eliminem un users per ID
			@DeleteMapping("/{id}")
			public ResponseEntity<Void> deleteProtectora(@PathVariable Long id) {
				protectoraServices.deleteProtectora(id);
				return ResponseEntity.noContent().build();
			}
}
