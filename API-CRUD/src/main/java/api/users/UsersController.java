package api.users;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.email.EmailService;

@RestController
@RequestMapping(value = "/home4paws/users")
public class UsersController {
	
	@Autowired
	private UsersService usersService;
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping
	public ResponseEntity<Map<String, String>> createUser(@RequestBody UsersEntities user) {
	    // Verificar si el correo ya está registrado
	    if (usersService.isEmailRegistered(user.getEmail())) {
	        // Retornar una respuesta clara en formato JSON
	        Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("message", "El correo electrónico ya está registrado.");
	        return ResponseEntity.badRequest().body(errorResponse);
	    }

	    // Intentar crear el usuario en la base de datos
	    boolean isCreated = usersService.createUser(user);

	    if (isCreated) {
	        // Enviar correo de bienvenida
	        emailService.emailWelcome(user.getEmail(), user.getName(), user.getSurname());

	        // Retornar respuesta exitosa
	        Map<String, String> successResponse = new HashMap<>();
	        successResponse.put("message", "Usuario creado con éxito y correo de bienvenida enviado.");
	        return ResponseEntity.ok(successResponse);
	    } else {
	        // Manejar caso de error al crear usuario
	        Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("message", "Error al crear el usuario.");
	        return ResponseEntity.badRequest().body(errorResponse);
	    }
	}
		//Obtenim un users per ID
		@PostMapping("/{id}")
		public ResponseEntity<UsersEntities> getUsersById(@PathVariable Long id) {
			Optional<UsersEntities> users = usersService.getUsersById(id);
			return users.map(ResponseEntity::ok)
					.orElse(ResponseEntity.notFound().build());
		}
		//Actualitzem un users per ID
		@PutMapping("/{id}")
		public ResponseEntity<UsersEntities> updateUsers(@PathVariable Long id, @RequestBody UsersEntities users){
			try {
				UsersEntities updateUsers = usersService.updateUsers(id, users);
				return ResponseEntity.ok(updateUsers);
			} catch (RuntimeException e) {
				return ResponseEntity.notFound().build();
			}
		}

		//Eliminem un users per ID
		@DeleteMapping("/{id}")
		public ResponseEntity<Void> deleteUsers(@PathVariable Long id) {
			usersService.deleteUsers(id);
			return ResponseEntity.noContent().build();
		}
		@PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
	        Optional<UsersEntities> user = usersService.findByEmail(loginRequest.getEmail());

	        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
	            return ResponseEntity.ok(new LoginResponse(user.get().getId())); // Devuelve la ID del usuario
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	        }
	    }
	}