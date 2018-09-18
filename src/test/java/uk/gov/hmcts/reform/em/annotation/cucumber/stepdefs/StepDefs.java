package uk.gov.hmcts.reform.em.annotation.cucumber.stepdefs;

import uk.gov.hmcts.reform.em.annotation.JhipstermojApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = JhipstermojApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
