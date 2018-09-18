package uk.gov.hmcts.reform.em.annotation.repository;

import uk.gov.hmcts.reform.em.annotation.domain.AnnotationSet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the AnnotationSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnotationSetRepository extends JpaRepository<AnnotationSet, Long> {

    Optional<AnnotationSet> findByDocumentIdAndCreatedBy(String documentId, String createdBy);

}
