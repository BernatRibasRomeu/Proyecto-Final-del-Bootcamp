package api.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import api.donations.DonationsEntities;
import api.users.UsersService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private UsersService userService;

	public void sendEmail(String to, String subject, String htmlBody) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(htmlBody, true); // El segundo parámetro indica que es HTML

			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new RuntimeException("Error al enviar el correo electrónico: " + e.getMessage());
		}
	}

	public void emailWelcome(String to, String name, String surname) {
		String subject = "Benvingut a Home4Paws!";
		String htmlContent = String.format(
				"<div style=\"font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px;\">"
						+ "<h1 style=\"color: #4CAF50; text-align: center;\">Benvingut a Home4Paws!</h1>"
						+ "<p style=\"font-size: 16px; color: #333;\">Hola <strong>%s %s</strong>,</p>"
						+ "<p style=\"font-size: 16px; color: #333;\">Gràcies per confiar en nosaltres, esperem que puguis trobar al amic que busques.</p>"
						+ "<p style=\"font-size: 16px; color: #333;\">El equip de <strong>Home4Paws</strong></p>"
						+ "<footer style=\"margin-top: 20px; text-align: center; font-size: 14px; color: #777;\">"
						+ "Home4Paws &copy; 2024" + "</footer>" + "</div>",
				name, surname);
		sendEmail(to, subject, htmlContent);
	}

	public void emailDonation(DonationsEntities donations) {
		// Donor information
		String donorEmail = donations.getEmail();
		String donorHtml = String.format(
				"<div style=\"font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px;\">"
						+ "<h1 style=\"color: #FF9800; text-align: center;\">Gràcies per la teva donació!</h1>"
						+ "<p style=\"font-size: 16px; color: #333;\">Hola <strong>%s</strong>,</p>"
						+ "<p style=\"font-size: 16px; color: #333;\">Agraim molt la teva contribució de <strong>%d €</strong>. "
						+ "Amb la teva ajuda, seguim treballant per ajudar als animals que mes ho necessiten.</p>"
						+ "<p style=\"font-size: 16px; color: #333;\">El equip de <strong>Home4Paws</strong></p>"
						+ "<footer style=\"margin-top: 20px; text-align: center; font-size: 14px; color: #777;\">"
						+ "Home4Paws &copy; 2024" + "</footer>" + "</div>",
				donations.getFullname(), donations.getAmount(), donations.getMessage());
		// Reciver informacion
		String receiverEmail = userService.findEmailById(donations.getReciverId());
		String receiverHtml = String.format(
				"<body style=\"font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;\">"
						+ "<div style=\"max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\">"
						+ "<h1 style=\"color: #4CAF50; text-align: center;\">¡Has rebut una donació!</h1>"
						+ "<p style=\"font-size: 16px; color: #333;\">Hola,</p>"
						+ "<p style=\"font-size: 16px; color: #333;\">Has rebut una donació de <b style=\"color: #FF5722;\">%d€</b> de <b style=\"color: #007BFF;\">%s</b>.</p>"
						+ "<p style=\"font-size: 16px; color: #333;\"><i>Missatge del donant:</i></p>"
						+ "<blockquote style=\"font-size: 16px; font-style: italic; color: #555; margin: 10px 0; padding: 10px; background-color: #f0f0f0; border-left: 4px solid #4CAF50;\">\"%s\"</blockquote>"
						+ "<p style=\"font-size: 16px; color: #333;\">¡Felicitats i seguirem treballant per poder ajudar!</p>"
						+ "<footer style=\"margin-top: 20px; text-align: center; font-size: 14px; color: #777;\">"
						+ "Home4Paws &copy; 2024" + "</footer>" + "</div>",
				donations.getAmount(), donations.getFullname(), donations.getMessage());
		// Enviar correos
		sendEmail(donorEmail, "Gracias per la teva donació", donorHtml);
		sendEmail(receiverEmail, "Has rebut una nova donació", receiverHtml);
	}
}