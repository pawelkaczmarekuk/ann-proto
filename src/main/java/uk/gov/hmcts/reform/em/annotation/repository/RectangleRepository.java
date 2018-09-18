package uk.gov.hmcts.reform.em.annotation.repository;

import uk.gov.hmcts.reform.em.annotation.domain.Rectangle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Rectangle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RectangleRepository extends JpaRepository<Rectangle, Long> {

}
