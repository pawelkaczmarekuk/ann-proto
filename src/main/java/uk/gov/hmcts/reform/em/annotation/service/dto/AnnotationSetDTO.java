package uk.gov.hmcts.reform.em.annotation.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the AnnotationSet entity.
 */
public class AnnotationSetDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private String documentId;

    private Set<AnnotationDTO> annotations;

    public Set<AnnotationDTO> getAnnotations() {
        return annotations;
    }

    public void setAnnotations(Set<AnnotationDTO> annotations) {
        this.annotations = annotations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AnnotationSetDTO annotationSetDTO = (AnnotationSetDTO) o;
        if (annotationSetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), annotationSetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AnnotationSetDTO{" +
            "id=" + getId() +
            ", documentId='" + getDocumentId() + "'" +
            "}";
    }
}
