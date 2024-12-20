package api.animal;

import java.io.Serializable;

import jakarta.persistence.Column;
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
@Table(name = "ANIMAL")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalEntities implements Serializable {

	private static final long serialVersionUID = 6261709104826593307L;

	// Utilitzem lombok per simplificar el codi i reduir el temps de escriptura, ja que ens crea automaticament els getters, setters i contructors
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "user_id")
	private Long userId;
	private String name;
	private String animal;
	private String age;
	private String sex;
	@Lob
	@Column(length = 100000) // Ajusta el tamaño según sea necesario
	private String image_url;

	//private String image_url;
	private String race;
	private String protectora;
	private String place;
	private Integer urgency;
	private String description;
	private String preferences;
	private String needs;
}