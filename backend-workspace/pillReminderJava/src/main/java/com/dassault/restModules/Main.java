package com.dassault.restModules;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.dassault.utils.Database;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		System.out.println("inside main");
		
		SpringApplication.run(Main.class, args);
	}
	
	@PostConstruct
	public void initialStartup() {
		System.out.println("inside initial startup");
		new Database().setConnection();
	}

}
