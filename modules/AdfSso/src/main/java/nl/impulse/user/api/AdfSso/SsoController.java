package nl.impulse.user.api.AdfSso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SsoController {

	private final SsoProperties ssoProperties;

	@Autowired
	public SsoController(SsoProperties ssoProperties) {
		this.ssoProperties = ssoProperties;
	}

	@Autowired
	private SsoService ssoService;

	@Transactional
	@RequestMapping(method = RequestMethod.GET, value = "/sso")
	public String getSsoUrl(@RequestParam(value = "client", required = true) Long client,
			@RequestParam(value = "volgnummer", required = true) Long volgnummer,
			@RequestParam(value = "params", required = false) String params,
			@RequestParam(value = "module", required = true) Long module) {

		return ssoProperties.getBaseUrl() + ssoService.getSsoUrl(client, volgnummer, params, module);
	}
}
