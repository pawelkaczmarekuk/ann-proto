package uk.gov.hmcts.reform.em.annotation.web.rest;

import uk.gov.hmcts.reform.em.annotation.JhipstermojApp;

import uk.gov.hmcts.reform.em.annotation.domain.Annotation;
import uk.gov.hmcts.reform.em.annotation.repository.AnnotationRepository;
import uk.gov.hmcts.reform.em.annotation.service.AnnotationService;
import uk.gov.hmcts.reform.em.annotation.service.dto.AnnotationDTO;
import uk.gov.hmcts.reform.em.annotation.service.mapper.AnnotationMapper;
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

import uk.gov.hmcts.reform.em.annotation.domain.enumeration.AnnotationType;
/**
 * Test class for the AnnotationResource REST controller.
 *
 * @see AnnotationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipstermojApp.class)
public class AnnotationResourceIntTest {

    private static final AnnotationType DEFAULT_ANNOTATION_TYPE = AnnotationType.AREA;
    private static final AnnotationType UPDATED_ANNOTATION_TYPE = AnnotationType.HIGHLIGHT;

    private static final Integer DEFAULT_PAGE = 1;
    private static final Integer UPDATED_PAGE = 2;

    private static final Integer DEFAULT_X = 1;
    private static final Integer UPDATED_X = 2;

    private static final Integer DEFAULT_Y = 1;
    private static final Integer UPDATED_Y = 2;

    private static final Integer DEFAULT_WIDTH = 1;
    private static final Integer UPDATED_WIDTH = 2;

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;

    @Autowired
    private AnnotationRepository annotationRepository;

    @Autowired
    private AnnotationMapper annotationMapper;
    
    @Autowired
    private AnnotationService annotationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnnotationMockMvc;

    private Annotation annotation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnnotationResource annotationResource = new AnnotationResource(annotationService);
        this.restAnnotationMockMvc = MockMvcBuilders.standaloneSetup(annotationResource)
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
    public static Annotation createEntity(EntityManager em) {
        Annotation annotation = new Annotation()
            .annotationType(DEFAULT_ANNOTATION_TYPE)
            .page(DEFAULT_PAGE)
            .x(DEFAULT_X)
            .y(DEFAULT_Y)
            .width(DEFAULT_WIDTH)
            .height(DEFAULT_HEIGHT);
        return annotation;
    }

    @Before
    public void initTest() {
        annotation = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnnotation() throws Exception {
        int databaseSizeBeforeCreate = annotationRepository.findAll().size();

        // Create the Annotation
        AnnotationDTO annotationDTO = annotationMapper.toDto(annotation);
        restAnnotationMockMvc.perform(post("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationDTO)))
            .andExpect(status().isCreated());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeCreate + 1);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getAnnotationType()).isEqualTo(DEFAULT_ANNOTATION_TYPE);
        assertThat(testAnnotation.getPage()).isEqualTo(DEFAULT_PAGE);
        assertThat(testAnnotation.getX()).isEqualTo(DEFAULT_X);
        assertThat(testAnnotation.getY()).isEqualTo(DEFAULT_Y);
        assertThat(testAnnotation.getWidth()).isEqualTo(DEFAULT_WIDTH);
        assertThat(testAnnotation.getHeight()).isEqualTo(DEFAULT_HEIGHT);
    }

    @Test
    @Transactional
    public void createAnnotationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = annotationRepository.findAll().size();

        // Create the Annotation with an existing ID
        annotation.setId(1L);
        AnnotationDTO annotationDTO = annotationMapper.toDto(annotation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnotationMockMvc.perform(post("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnnotations() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        // Get all the annotationList
        restAnnotationMockMvc.perform(get("/api/annotations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(annotation.getId().intValue())))
            .andExpect(jsonPath("$.[*].annotationType").value(hasItem(DEFAULT_ANNOTATION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].page").value(hasItem(DEFAULT_PAGE)))
            .andExpect(jsonPath("$.[*].x").value(hasItem(DEFAULT_X)))
            .andExpect(jsonPath("$.[*].y").value(hasItem(DEFAULT_Y)))
            .andExpect(jsonPath("$.[*].width").value(hasItem(DEFAULT_WIDTH)))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)));
    }
    
    @Test
    @Transactional
    public void getAnnotation() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        // Get the annotation
        restAnnotationMockMvc.perform(get("/api/annotations/{id}", annotation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(annotation.getId().intValue()))
            .andExpect(jsonPath("$.annotationType").value(DEFAULT_ANNOTATION_TYPE.toString()))
            .andExpect(jsonPath("$.page").value(DEFAULT_PAGE))
            .andExpect(jsonPath("$.x").value(DEFAULT_X))
            .andExpect(jsonPath("$.y").value(DEFAULT_Y))
            .andExpect(jsonPath("$.width").value(DEFAULT_WIDTH))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT));
    }

    @Test
    @Transactional
    public void getNonExistingAnnotation() throws Exception {
        // Get the annotation
        restAnnotationMockMvc.perform(get("/api/annotations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnnotation() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();

        // Update the annotation
        Annotation updatedAnnotation = annotationRepository.findById(annotation.getId()).get();
        // Disconnect from session so that the updates on updatedAnnotation are not directly saved in db
        em.detach(updatedAnnotation);
        updatedAnnotation
            .annotationType(UPDATED_ANNOTATION_TYPE)
            .page(UPDATED_PAGE)
            .x(UPDATED_X)
            .y(UPDATED_Y)
            .width(UPDATED_WIDTH)
            .height(UPDATED_HEIGHT);
        AnnotationDTO annotationDTO = annotationMapper.toDto(updatedAnnotation);

        restAnnotationMockMvc.perform(put("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationDTO)))
            .andExpect(status().isOk());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getAnnotationType()).isEqualTo(UPDATED_ANNOTATION_TYPE);
        assertThat(testAnnotation.getPage()).isEqualTo(UPDATED_PAGE);
        assertThat(testAnnotation.getX()).isEqualTo(UPDATED_X);
        assertThat(testAnnotation.getY()).isEqualTo(UPDATED_Y);
        assertThat(testAnnotation.getWidth()).isEqualTo(UPDATED_WIDTH);
        assertThat(testAnnotation.getHeight()).isEqualTo(UPDATED_HEIGHT);
    }

    @Test
    @Transactional
    public void updateNonExistingAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();

        // Create the Annotation
        AnnotationDTO annotationDTO = annotationMapper.toDto(annotation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnotationMockMvc.perform(put("/api/annotations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annotationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnnotation() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        int databaseSizeBeforeDelete = annotationRepository.findAll().size();

        // Get the annotation
        restAnnotationMockMvc.perform(delete("/api/annotations/{id}", annotation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Annotation.class);
        Annotation annotation1 = new Annotation();
        annotation1.setId(1L);
        Annotation annotation2 = new Annotation();
        annotation2.setId(annotation1.getId());
        assertThat(annotation1).isEqualTo(annotation2);
        annotation2.setId(2L);
        assertThat(annotation1).isNotEqualTo(annotation2);
        annotation1.setId(null);
        assertThat(annotation1).isNotEqualTo(annotation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnotationDTO.class);
        AnnotationDTO annotationDTO1 = new AnnotationDTO();
        annotationDTO1.setId(1L);
        AnnotationDTO annotationDTO2 = new AnnotationDTO();
        assertThat(annotationDTO1).isNotEqualTo(annotationDTO2);
        annotationDTO2.setId(annotationDTO1.getId());
        assertThat(annotationDTO1).isEqualTo(annotationDTO2);
        annotationDTO2.setId(2L);
        assertThat(annotationDTO1).isNotEqualTo(annotationDTO2);
        annotationDTO1.setId(null);
        assertThat(annotationDTO1).isNotEqualTo(annotationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(annotationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(annotationMapper.fromId(null)).isNull();
    }
}
