package uk.gov.hmcts.reform.em.annotation.repository;

import uk.gov.hmcts.reform.em.annotation.domain.AnnotationSet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AnnotationSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnotationSetRepository extends JpaRepository<AnnotationSet, Long> {

}
