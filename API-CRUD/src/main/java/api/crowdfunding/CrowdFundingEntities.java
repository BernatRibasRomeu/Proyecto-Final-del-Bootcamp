package api.crowdfunding;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CROWFUNDING")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrowdFundingEntities implements Serializable{
	
	private static final long serialVersionUID = -6867346572734973267L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	@Lob
    private byte[] images;
	private String type;
	private String campaigntitle;
	private String description;
	private Integer raised;
	private Integer target;
	private LocalDate remainingtime;
}
