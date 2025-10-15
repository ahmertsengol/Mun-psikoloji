/**
 * Audit logging utility functions
 */

import { prisma } from '@/lib/db/prisma';

type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH';

interface CreateAuditLogParams {
  userId?: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}

/**
 * Creates an audit log entry
 * @param params - Audit log parameters
 */
export async function createAuditLog({
  userId,
  action,
  entity,
  entityId,
  metadata,
}: CreateAuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch (error) {
    // Log error but don't throw - audit logs shouldn't break main functionality
    console.error('Failed to create audit log:', error);
  }
}
