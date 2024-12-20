package api.users;

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
@Table(name = "USERS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersEntities implements Serializable{

	private static final long serialVersionUID = 6387974381673711087L;

	// Utilitzem lombok per simplificar el codi i reduir el temps de escriptura, ja que ens crea automaticament els getters, setters i contructors
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String surname;
	private String password;
	private String email;
	private String telephone;
	private String place;
}
