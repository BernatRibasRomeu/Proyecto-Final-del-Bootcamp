package api.protectora;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PROTECTORA")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProtectoraEntities implements Serializable{

	private static final long serialVersionUID = 3545637494213046617L;
	
	// Utilitzem lombok per simplificar el codi i reduir el temps de escriptura, ja que ens crea automaticament els getters, setters i contructors
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String password;
	private String place;
	private String logo_img;
	private String email;
	private Integer telephone;
	private String type;
}
