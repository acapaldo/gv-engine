/*******************************************************************************
 * Copyright (c) 2009, 2016 GreenVulcano ESB Open Source Project.
 * All rights reserved.
 *
 * This file is part of GreenVulcano ESB.
 *
 * GreenVulcano ESB is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * GreenVulcano ESB is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with GreenVulcano ESB. If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/
package it.greenvulcano.event.internal;

import it.greenvulcano.event.interfaces.Event;

/**
 * EventData class
 *
 * @version 3.0.0 Feb 17, 2010
 * @author GreenVulcano Developer Team
 *
 *
 */
public class EventData
{
    /**
     * Event.
     */
    Event  event      = null;
    /**
     * Method to invoke.
     */
    String methodName = null;

    /**
     * Constructor.
     *
     * @param methodName
     *        the method to invoke
     * @param event
     *        the event to dispatch
     */
    public EventData(String methodName, Event event)
    {
        this.methodName = methodName;
        this.event = event;
    }
}
