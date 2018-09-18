package uk.gov.hmcts.reform.em.annotation.service.mapper;

import uk.gov.hmcts.reform.em.annotation.domain.*;
import uk.gov.hmcts.reform.em.annotation.service.dto.AnnotationSetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AnnotationSet and its DTO AnnotationSetDTO.
 */
@Mapper(componentModel = "spring", uses = {AnnotationMapper.class})
public interface AnnotationSetMapper extends EntityMapper<AnnotationSetDTO, AnnotationSet> {


    @Mapping(target = "annotations", ignore = true)
    AnnotationSet toEntity(AnnotationSetDTO annotationSetDTO);

    default AnnotationSet fromId(Long id) {
        if (id == null) {
            return null;
        }
        AnnotationSet annotationSet = new AnnotationSet();
        annotationSet.setId(id);
        return annotationSet;
    }
}
