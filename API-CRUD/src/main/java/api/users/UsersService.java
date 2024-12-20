package api.users;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
	
    @Autowired
    UsersRepository usersRepository;

    // Create
    public boolean createUser(UsersEntities user) {
        try {
            UsersEntities savedUser = usersRepository.save(user); // Guardar usuario
            return savedUser != null && savedUser.getId() != null; // Comprobar que fue guardado
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // Update
    public UsersEntities updateUsers(Long id, UsersEntities updatedUsers) {
        return usersRepository.findById(id)
                .map(existingUsers -> {
                    if (updatedUsers.getName() != null) {
                        existingUsers.setName(updatedUsers.getName());
                    }
                    if (updatedUsers.getSurname() != null) {
                        existingUsers.setSurname(updatedUsers.getSurname());
                    }
                    if (updatedUsers.getPassword() != null) {
                        existingUsers.setPassword(updatedUsers.getPassword());
                    }
                    if (updatedUsers.getEmail() != null) {
                        existingUsers.setEmail(updatedUsers.getEmail());
                    }
                    if (updatedUsers.getTelephone() != null && updatedUsers.getTelephone().matches("\\d+")) {
                        existingUsers.setTelephone(updatedUsers.getTelephone());
                    }
                    if (updatedUsers.getPlace() != null) {
                        existingUsers.setPlace(updatedUsers.getPlace());
                    }
                    
                    return usersRepository.save(existingUsers);
                })
                .orElseThrow(() -> new RuntimeException("No hem trobat cap usuari amb la ID " + id));
    }

    // Read all
    public List<UsersEntities> getAllUsers() {
        return usersRepository.findAll();
    }

    // Read by id
    public Optional<UsersEntities> getUsersById(Long id) {
        return usersRepository.findById(id);
    }

    // Delete
    public void deleteUsers(Long id) {
        usersRepository.deleteById(id);
    }
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    // Search email in DDBB
    public Optional<UsersEntities> findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
    // Check if email exists
    public boolean isEmailRegistered(String email) {
        return usersRepository.existsByEmail(email);
    }
    // Search email by id
    public String findEmailById(Long userId) {
        return usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"))
                .getEmail();
    }
}