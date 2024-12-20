package api.petitions;

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
@Table(name = "PETICIONES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetitionsEntities implements Serializable{
	
	private static final long serialVersionUID = -6351052304198968490L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String surname;
	private String email;
	private String telephone;
	private String place;
	private String message;
	@Column(name = "reciver_id")
    private Long reciverId;
	@Column(name = "emitter_id")
	private Long emitterId;
	private Long animal_id;
	private String status;
}
