package api.protectora;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProtectoraRepository extends JpaRepository<ProtectoraEntities, Long>{}