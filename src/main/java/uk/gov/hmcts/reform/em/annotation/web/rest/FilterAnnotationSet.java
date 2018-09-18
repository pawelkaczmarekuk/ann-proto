package uk.gov.hmcts.reform.em.annotation.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.gov.hmcts.reform.em.annotation.service.AnnotationSetService;
import uk.gov.hmcts.reform.em.annotation.service.dto.AnnotationSetDTO;
import uk.gov.hmcts.reform.em.annotation.web.rest.errors.ResourceNotFoundException;

import java.util.Optional;

/**
 * REST controller for managing AnnotationSet.
 */
@RestController
@RequestMapping("/api")
public class FilterAnnotationSet {

    private final Logger log = LoggerFactory.getLogger(FilterAnnotationSet.class);

    private final AnnotationSetService annotationSetService;

    public FilterAnnotationSet(AnnotationSetService annotationSetService) {
        this.annotationSetService = annotationSetService;
    }

    @GetMapping("/annotation-sets/filter")
    @Timed
    public ResponseEntity<AnnotationSetDTO> getAllAnnotationSets(@RequestParam("documentId") String documentId) {
        log.debug("REST request to get a page of AnnotationSets");
        Optional<AnnotationSetDTO> optionalAnnotationSetDTO = annotationSetService.findOneByDocumentId(documentId);
        return optionalAnnotationSetDTO
            .map( annotationSetDTO -> ResponseEntity.ok(annotationSetDTO))
            .orElseThrow( () -> new ResourceNotFoundException("Could not find annotation set for this document id#" + documentId) );
    }

}
