package uk.gov.hmcts.reform.em.annotation.web.rest;

import uk.gov.hmcts.reform.em.annotation.JhipstermojApp;

import uk.gov.hmcts.reform.em.annotation.domain.AnnotationSet;
import uk.gov.hmcts.reform.em.annotation.repository.AnnotationSetRepository;
import uk.gov.hmcts.reform.em.annotation.service.AnnotationSetService;
import uk.gov.hmcts.reform.em.annotation.service.dto.AnnotationSetDTO;
import uk.gov.hmcts.reform.em.annotation.service.mapper.AnnotationSetMapper;
import uk.gov.hmcts.reform.em.annotation.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static uk.gov.hmcts.reform.em.annotation.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AnnotationSetResource REST controller.
 *
 * @see AnnotationSetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipstermojApp.class)
public class AnnotationSetResourceIntTest {

    private static final String DEFAULT_DOCUMENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_ID = "BBBBBBBBBB";

    @Autowired
    private AnnotationSetRepository annotationSetRepository;

    @Autowired
    private AnnotationSetMapper annotationSetMapper;
    
    @Autowired
    private AnnotationSetService annotationSetService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnnotationSetMockMvc;

    private AnnotationSet annotationSet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnnotationSetResource annotationSetResource = new AnnotationSetResource(annotationSetService);
        this.restAnnotationSetMockMvc = MockMvcBuilders.standaloneSetup(annotationSetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnnotationSet createEntity(EntityManager em) {
        AnnotationSet annotationSet = new AnnotationSet()
            .documentId(DEFAULT_DOCUMENT_ID);
        return annotationSet;
    }

    @Before
    public void initTest() {
        annotationSet = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnnotationSet() throws Exception {
        int databaseSizeBeforeCreate = annotationSetRepository.findAll().size();

        // Create the AnnotationSet
        AnnotationSetDTO annotationSetDTO = annotationSetMapper.toDto(annotationSet);
        restAnnotationSetMockMvc.perform(post("/api/annotation-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationSetDTO)))
            .andExpect(status().isCreated());

        // Validate the AnnotationSet in the database
        List<AnnotationSet> annotationSetList = annotationSetRepository.findAll();
        assertThat(annotationSetList).hasSize(databaseSizeBeforeCreate + 1);
        AnnotationSet testAnnotationSet = annotationSetList.get(annotationSetList.size() - 1);
        assertThat(testAnnotationSet.getDocumentId()).isEqualTo(DEFAULT_DOCUMENT_ID);
    }

    @Test
    @Transactional
    public void createAnnotationSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = annotationSetRepository.findAll().size();

        // Create the AnnotationSet with an existing ID
        annotationSet.setId(1L);
        AnnotationSetDTO annotationSetDTO = annotationSetMapper.toDto(annotationSet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnotationSetMockMvc.perform(post("/api/annotation-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationSetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AnnotationSet in the database
        List<AnnotationSet> annotationSetList = annotationSetRepository.findAll();
        assertThat(annotationSetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnnotationSets() throws Exception {
        // Initialize the database
        annotationSetRepository.saveAndFlush(annotationSet);

        // Get all the annotationSetList
        restAnnotationSetMockMvc.perform(get("/api/annotation-sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(annotationSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentId").value(hasItem(DEFAULT_DOCUMENT_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getAnnotationSet() throws Exception {
        // Initialize the database
        annotationSetRepository.saveAndFlush(annotationSet);

        // Get the annotationSet
        restAnnotationSetMockMvc.perform(get("/api/annotation-sets/{id}", annotationSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(annotationSet.getId().intValue()))
            .andExpect(jsonPath("$.documentId").value(DEFAULT_DOCUMENT_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnnotationSet() throws Exception {
        // Get the annotationSet
        restAnnotationSetMockMvc.perform(get("/api/annotation-sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnnotationSet() throws Exception {
        // Initialize the database
        annotationSetRepository.saveAndFlush(annotationSet);

        int databaseSizeBeforeUpdate = annotationSetRepository.findAll().size();

        // Update the annotationSet
        AnnotationSet updatedAnnotationSet = annotationSetRepository.findById(annotationSet.getId()).get();
        // Disconnect from session so that the updates on updatedAnnotationSet are not directly saved in db
        em.detach(updatedAnnotationSet);
        updatedAnnotationSet
            .documentId(UPDATED_DOCUMENT_ID);
        AnnotationSetDTO annotationSetDTO = annotationSetMapper.toDto(updatedAnnotationSet);

        restAnnotationSetMockMvc.perform(put("/api/annotation-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationSetDTO)))
            .andExpect(status().isOk());

        // Validate the AnnotationSet in the database
        List<AnnotationSet> annotationSetList = annotationSetRepository.findAll();
        assertThat(annotationSetList).hasSize(databaseSizeBeforeUpdate);
        AnnotationSet testAnnotationSet = annotationSetList.get(annotationSetList.size() - 1);
        assertThat(testAnnotationSet.getDocumentId()).isEqualTo(UPDATED_DOCUMENT_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingAnnotationSet() throws Exception {
        int databaseSizeBeforeUpdate = annotationSetRepository.findAll().size();

        // Create the AnnotationSet
        AnnotationSetDTO annotationSetDTO = annotationSetMapper.toDto(annotationSet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnotationSetMockMvc.perform(put("/api/annotation-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationSetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AnnotationSet in the database
        List<AnnotationSet> annotationSetList = annotationSetRepository.findAll();
        assertThat(annotationSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnnotationSet() throws Exception {
        // Initialize the database
        annotationSetRepository.saveAndFlush(annotationSet);

        int databaseSizeBeforeDelete = annotationSetRepository.findAll().size();

        // Get the annotationSet
        restAnnotationSetMockMvc.perform(delete("/api/annotation-sets/{id}", annotationSet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AnnotationSet> annotationSetList = annotationSetRepository.findAll();
        assertThat(annotationSetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnotationSet.class);
        AnnotationSet annotationSet1 = new AnnotationSet();
        annotationSet1.setId(1L);
        AnnotationSet annotationSet2 = new AnnotationSet();
        annotationSet2.setId(annotationSet1.getId());
        assertThat(annotationSet1).isEqualTo(annotationSet2);
        annotationSet2.setId(2L);
        assertThat(annotationSet1).isNotEqualTo(annotationSet2);
        annotationSet1.setId(null);
        assertThat(annotationSet1).isNotEqualTo(annotationSet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnotationSetDTO.class);
        AnnotationSetDTO annotationSetDTO1 = new AnnotationSetDTO();
        annotationSetDTO1.setId(1L);
        AnnotationSetDTO annotationSetDTO2 = new AnnotationSetDTO();
        assertThat(annotationSetDTO1).isNotEqualTo(annotationSetDTO2);
        annotationSetDTO2.setId(annotationSetDTO1.getId());
        assertThat(annotationSetDTO1).isEqualTo(annotationSetDTO2);
        annotationSetDTO2.setId(2L);
        assertThat(annotationSetDTO1).isNotEqualTo(annotationSetDTO2);
        annotationSetDTO1.setId(null);
        assertThat(annotationSetDTO1).isNotEqualTo(annotationSetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(annotationSetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(annotationSetMapper.fromId(null)).isNull();
    }
}
