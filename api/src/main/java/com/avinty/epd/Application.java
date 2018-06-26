package com.avinty.epd;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application implements CommandLineRunner {

	// @Value("${app.topic.client}")
	private String topic = "client.t";

	@Autowired
	private ClientRepository repository;

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	@RequestMapping("/")
	public String home() {
		return "Avinty API";
	}

	@RequestMapping(path = "/caseload")
	public List<Client> caseload() {
		return repository.findAll();
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// repository.deleteAll();

		// save a couple of clients

		Client alice = new Client("Alice", "Smith");
		repository.save(alice);
		kafkaTemplate.send(topic, alice.firstName);
//		Client bob = new Client("Bob", "Smith");
//		repository.save(bob);
//		kafkaTemplate.send(topic, bob.firstName);
//
//		// fetch all clients
//		System.out.println("Customers found with findAll():");
//		System.out.println("-------------------------------");
//		for (Client client : repository.findAll()) {
//			System.out.println(client);
//		}
//		System.out.println();
//
//		// fetch an individual client
//		// System.out.println("Client found with findByFirstName('Alice'):");
//		// System.out.println("--------------------------------");
//		// System.out.println(repository.findByFirstName("Alice"));
//
//		System.out.println("Customers found with findByLastName('Smith'):");
//		System.out.println("--------------------------------");
//		for (Client client : repository.findByLastName("Smith")) {
//			System.out.println(client);
//		}

	}

    @KafkaListener(topics = "client.t", groupId="client")
    public void receive(@Payload String data) {
        System.out.println("received data='{}'" + data);
    }
	
}
