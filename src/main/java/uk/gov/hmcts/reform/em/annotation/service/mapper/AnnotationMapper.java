package uk.gov.hmcts.reform.em.annotation.service.mapper;

import uk.gov.hmcts.reform.em.annotation.domain.*;
import uk.gov.hmcts.reform.em.annotation.service.dto.AnnotationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Annotation and its DTO AnnotationDTO.
 */
@Mapper(componentModel = "spring", uses = {AnnotationSetMapper.class, RectangleMapper.class, CommentMapper.class})
public interface AnnotationMapper extends EntityMapper<AnnotationDTO, Annotation> {

    @Mapping(source = "annotationSet.id", target = "annotationSetId")
    AnnotationDTO toDto(Annotation annotation);

    @Mapping(target = "comments")
    @Mapping(target = "rectangles")
    @Mapping(source = "annotationSetId", target = "annotationSet")
    Annotation toEntity(AnnotationDTO annotationDTO);

    default Annotation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Annotation annotation = new Annotation();
        annotation.setId(id);
        return annotation;
    }
}
