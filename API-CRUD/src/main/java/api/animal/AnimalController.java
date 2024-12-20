package api.animal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/home4paws/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<AnimalEntities> createAnimal(
            @RequestParam("name") String name,
            @RequestParam("userId") Long userId,
            @RequestParam("animal") String animal,
            @RequestParam("age") String age,
            @RequestParam("sex") String sex,
            @RequestParam("race") String race,
            @RequestParam("protectora") String protectora,
            @RequestParam("place") String place,
            @RequestParam("urgency") Integer urgency,
            @RequestParam("description") String description,
            @RequestParam("preferences") String preferences,
            @RequestParam("needs") String needs,
            @RequestParam("imageUrl") MultipartFile imageUrl) {

        try {
            // Validar que el archivo es una imagen
            String extension = getFileExtension(imageUrl.getOriginalFilename());
            if (!isValidImageExtension(extension)) {
                throw new IllegalArgumentException("Formato de imagen no soportado: " + extension);
            }

            // Convertir la imagen a byte[]
            byte[] imageBytes = imageUrl.getBytes();

            // Codificar la imagen en Base64 y agregar el prefijo
            String base64Image = "data:" + imageUrl.getContentType() + ";base64," + Base64.getEncoder().encodeToString(imageBytes);

            // Crear la entidad del animal y asignar los datos
            AnimalEntities animalEntity = new AnimalEntities();
            animalEntity.setName(name);
            animalEntity.setUserId(userId);
            animalEntity.setAnimal(animal);
            animalEntity.setAge(age);
            animalEntity.setSex(sex);
            animalEntity.setRace(race);
            animalEntity.setProtectora(protectora);
            animalEntity.setPlace(place);
            animalEntity.setUrgency(urgency);
            animalEntity.setDescription(description);
            animalEntity.setPreferences(preferences);
            animalEntity.setNeeds(needs);
            animalEntity.setImage_url(base64Image); // Guardar la imagen codificada en Base64

            // Guardar el animal en la base de datos
            AnimalEntities savedAnimal = animalService.createAnimal(animalEntity);
            return ResponseEntity.ok(savedAnimal);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null); // Error al procesar la imagen
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(null); // Error de formato de imagen no válido
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Error general
        }
    }

    // Método para validar la extensión de la imagen
    private boolean isValidImageExtension(String extension) {
        String[] validExtensions = {"jpg", "jpeg", "png", "gif"};
        return Arrays.asList(validExtensions).contains(extension.toLowerCase());
    }

    // Método para obtener la extensión de un archivo
    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty() || !fileName.contains(".")) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf('.') + 1);
    }


    // Obtener todos los animales
    @GetMapping
    public List<AnimalEntities> getAllAnimals() {
        List<AnimalEntities> animals = animalService.getAllAnimals();




        return animals;
    }

    // Obtener un animal por ID
    @GetMapping("/{id}")
    public ResponseEntity<AnimalEntities> getAnimalById(@PathVariable Long id) {
        Optional<AnimalEntities> animal = animalService.getAnimalById(id);

        // Si el animal tiene imagen, convertirla a Base64
        return animal.map(a -> {

            return ResponseEntity.ok(a);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Actualizar un animal por ID
    @PutMapping("/{id}")
    public ResponseEntity<AnimalEntities> updateAnimal(@PathVariable Long id, @RequestBody AnimalEntities animal) {
        try {
            AnimalEntities updatedAnimal = animalService.updateAnimal(id, animal);
            return ResponseEntity.ok(updatedAnimal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un animal por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
        return ResponseEntity.noContent().build();
    }
}
//    // Método para obtener la extensión del archivo
//    private String getFileExtension(String filename) {
//        return filename.substring(filename.lastIndexOf('.') + 1);
//    }

//    // Método para validar las extensiones de imagen soportadas
//    private boolean isValidImageExtension(String extension) {
//        return extension.equalsIgnoreCase("png") || extension.equalsIgnoreCase("jpeg") || extension.equalsIgnoreCase("jpg");
//    }
//}