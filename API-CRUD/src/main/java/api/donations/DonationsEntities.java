package api.donations;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DONACIONES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationsEntities implements Serializable {

	private static final long serialVersionUID = 2482109772725128348L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Integer amount;
	private String fullname;
	private String email;
	private String message;
	@Column(name = "reciver_id")
    private Long reciverId;
	@Column(name = "emitter_id")
	private Long emitterId;
	private Long animal_id;
}
