package com.backend.eduroom.util;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdResolver;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;

@AllArgsConstructor
public class EntityIdResolver implements ObjectIdResolver {
    private final EntityManager entityManager;

    @Override
    public void bindItem(ObjectIdGenerator.IdKey id, Object pojo) {

    }

    @Override
    public Object resolveId(ObjectIdGenerator.IdKey id) {
        return entityManager.find(id.scope, Long.parseLong(id.key.toString()));
    }

    @Override
    public ObjectIdResolver newForDeserialization(Object context) {
        return this;
    }

    @Override
    public boolean canUseFor(ObjectIdResolver resolverType) {
        return false;
    }
}