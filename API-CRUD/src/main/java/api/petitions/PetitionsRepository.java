package api.petitions;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetitionsRepository extends JpaRepository<PetitionsEntities, Long>{
	List<PetitionsEntities> findByReciverId(Long reciverId);
	List<PetitionsEntities> findByEmitterId(Long emitterId);
}
