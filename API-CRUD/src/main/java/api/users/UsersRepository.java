package api.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntities, Long>{
	Optional<UsersEntities> findByEmail(String email);
	boolean existsByEmail(String email);
}
