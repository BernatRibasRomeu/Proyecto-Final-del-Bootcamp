package api.donations;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationsRepository extends JpaRepository<DonationsEntities, Long>{
	List<DonationsEntities> findByReciverIdAndAmountGreaterThan(Long reciverId, Integer amount);
	List<DonationsEntities> findByEmitterIdAndAmountGreaterThan(Long emitterId, Integer amount);
}