package api.crowdfunding;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrowdFundingRepository extends JpaRepository<CrowdFundingEntities, Long>{}