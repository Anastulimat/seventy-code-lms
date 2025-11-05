"use client";

import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    rectIntersection,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {useState} from "react";
import {CSS} from '@dnd-kit/utilities';

// ----------------------------------------------------------------------

export function CourseStructure() {
    const [items, setItems] = useState(['1', '2', '3']);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function SortableItem(props: { id: string }) {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({id: props.id});

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {props.id}
            </div>
        );
    }


    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (!over) return;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }


    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b border-border">
                    <CardTitle>Chapters</CardTitle>
                </CardHeader>

                <CardContent>
                    <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={items}
                    >
                        {items.map((item) => (
                            <SortableItem key={item} id={item}/>
                        ))}
                    </SortableContext>
                </CardContent>
            </Card>

        </DndContext>
    )
}
