package com.avinty.epd;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;

import com.avinty.epd.caseload.Client;
import com.avinty.epd.caseload.ClientRepository;

@SpringBootApplication
public class Application implements CommandLineRunner {

	 @Value("${app.topic.client}")
	private String topic;

	@Autowired
	private ClientRepository repository;

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// repository.deleteAll();
		Client alice = new Client("Alice", "Smith");
		repository.save(alice);
		kafkaTemplate.send(topic, alice.firstName);
	}

    @KafkaListener(topics = "client.t", groupId="client")
    public void receive(@Payload String data) {
        System.out.println("received data='{}'" + data);
    }
	
}
