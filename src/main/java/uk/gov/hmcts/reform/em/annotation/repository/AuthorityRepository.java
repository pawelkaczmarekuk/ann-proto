package uk.gov.hmcts.reform.em.annotation.repository;

import uk.gov.hmcts.reform.em.annotation.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
