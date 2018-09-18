package uk.gov.hmcts.reform.em.annotation.service.mapper;

import uk.gov.hmcts.reform.em.annotation.domain.*;
import uk.gov.hmcts.reform.em.annotation.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comment and its DTO CommentDTO.
 */
@Mapper(componentModel = "spring", uses = {AnnotationMapper.class})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {

    @Mapping(source = "annotation.id", target = "annotationId")
    CommentDTO toDto(Comment comment);

    @Mapping(source = "annotationId", target = "annotation")
    Comment toEntity(CommentDTO commentDTO);

    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
